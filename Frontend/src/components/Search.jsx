const SearchBar = () => (
    <form action="/" method="get">
        <div class="input-group">
  <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
  <button type="button" class = "btn btn-danger btn-floating">search</button>
</div>
    </form>
);

export default SearchBar;