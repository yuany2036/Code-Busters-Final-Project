class APIQueryHandler {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
  
    //! http://localhost:8000/[resource-name]?[query-string]
    //* user example: http://localhost:8000/users?age=41
    //* user example: http://localhost:8000/users?age[gte]=41
  
    filterDocs() {
      const queryObj = { ...this.queryString };
  
      ['sort', 'page', 'limit', 'field'].forEach((el) => delete queryObj[el]);
  
      const queryStr = JSON.stringify(queryObj);
  
      this.query = this.query.find(JSON.parse(queryStr));
  
      return this;
    }
  
    //! http://localhost:8000/[resource-name]?sort=[critiria]
    //* user example: http://localhost:8000/users?sort=age
    //* record example: http://localhost:8000/records?sort=price,year
  
    sortDocs() {
      if (this.queryString.sort) {
        const critiria = this.queryString.sort.split(',').join(' ');
        this.query = this.query.sort(critiria);
      }
      return this;
    }
  
    //! http://localhost:8000/[resource-name]?field=[field-name]
    //* user example: http://localhost:8000/users?field=age
    //* record example: http://localhost:8000/records?field=title
  
    limitFields() {
      if (this.queryString.field) {
        const critiria = this.queryString.sort.split(',').join(' ');
        this.query = this.query.select(critiria);
      }
      return this;
    }
  
    //! http://localhost:8000/[resource-name]?page=[page-number]&limit=[number-of-docs]
    //* user example: http://localhost:8000/users?page=2&limit=5
    //* record example: http://localhost:8000/records?page=1&limit=3
  
    paginateDocs() {
      const limit = +this.queryString.limit || 20;
      const page = +this.queryString.page || 1;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
      return this;
    }
  }
  
  module.exports = APIQueryHandler;