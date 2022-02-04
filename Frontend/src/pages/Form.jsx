export const form = () => {
    return (
        <div>
            <div>
        <form>
          <div>
            
            <label>
              Name:
              <input type="text" name="name" />
            </label>
          </div>
          
          <div>
            <label>
              Product Name:
              <input type="text" name="product_name" />
            </label>
          </div>

          <div>
            <label>
              Product Catagory:
              <input type="text" name="product_catagory" />
            </label>
          </div>

          <div>
            <label>
              Product Condition:
              <input type="text" name="product_condition" />
            </label>
          </div>
          
          <div>
            <label>
              Location:
              <input type="text" name="Location" />
            </label>
          </div>

          


          <input type="submit" value="Submit" />
        </form>
      </div>
        </div>
    )
}
