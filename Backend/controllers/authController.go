// google.New("824527626949-6928kptuv979o73m7m0jmov6oi8urjuo.apps.googleusercontent.com", "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", "http://localhost:8080/auth/google/callback", "email", "profile"),
package controllers

import (
	"GatorMarketPlace/utils"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var (
	state = "holderState"
)

type googleAuthResponse struct {
	ID            string `json:"id"`
	Email         string `json:"email"`
	VerifiedEmail bool   `json:"verified_email"`
	Name          string `json:"name"`
	GivenName     string `json:"given_name"`
	FamilyName    string `json:"family_name"`
	Picture       string `json:"picture"`
	Locale        string `json:"locale"`
}

type customClaims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

func oAuthGoogleConfig() *oauth2.Config {
	return &oauth2.Config{
		RedirectURL:  "http://localhost:8000/google/callback",
		ClientID:     os.Getenv("GOOGLE_OAUTH_CLIENT_ID"),
		ClientSecret: os.Getenv("GOOGLE_OAUTH_CLIENT_SECRET"),
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"},
		Endpoint:     google.Endpoint,
	}
}

func GoogleLogin() fiber.Handler {
	return func(c *fiber.Ctx) error {

		tempState, err := utils.GenerateRandomString()
		state = tempState
		if err != nil {
			fmt.Println(err)
			return c.SendString("Some error has occurred.")
		}
		url := oAuthGoogleConfig().AuthCodeURL(state)
		return c.Redirect(url, http.StatusTemporaryRedirect)
	}
}

func GoogleCallback() fiber.Handler {
	return func(c *fiber.Ctx) error {
		if c.FormValue("state") != state {
			return c.Redirect("/", http.StatusTemporaryRedirect)
		}
		token, err := oAuthGoogleConfig().Exchange(context.Background(), c.FormValue("code"))
		if err != nil {
			fmt.Print(err)
			c.Status(http.StatusInternalServerError)
			return c.SendString("Error in Token Callback")
		}

		resp, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)
		if err != nil {
			return c.SendString("Cannot get your details bro")
		}
		defer resp.Body.Close()
		googleResponse := googleAuthResponse{}
		err = json.NewDecoder(resp.Body).Decode(&googleResponse)

		if err != nil {
			fmt.Println(err)
			c.Status(http.StatusInternalServerError)
			return c.JSON("Error")
		}

		tkn, _ := GenerateToken(&googleResponse)
		cookie := fiber.Cookie{
			Name:     "jwt",
			Value:    tkn,
			Expires:  time.Now().Add(time.Hour * 24),
			HTTPOnly: true,
		}
		fmt.Print(cookie.Value)
		c.Cookie(&cookie)

		return c.Redirect("http://localhost:8000/api/user", http.StatusTemporaryRedirect)
	}
}

func GenerateToken(googleResponse *googleAuthResponse) (string, error) {

	claims := customClaims{
		Username: googleResponse.Name,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 72).Unix(),
			Issuer:    googleResponse.ID,
		},
	}
	t := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := t.SignedString([]byte(os.Getenv("JWT_SECRET")))

	return tokenString, err
}

func ValidateToken(signedToken string) (claims *customClaims, err error) {

	token, err := jwt.ParseWithClaims(signedToken, &customClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if err != nil {
		return
	}

	claims, ok := token.Claims.(*customClaims)
	if !ok {
		return
	}

	if claims.ExpiresAt < time.Now().Local().Unix() {
		return
	}

	return claims, err

}

func User(c *fiber.Ctx) error {

	cookie := c.Cookies("jwt")
	claims, err := ValidateToken(cookie)
	if err != nil {
		return c.JSON("Error")
	}
	return c.SendString(claims.Username)
}

func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "success",
	})
}
