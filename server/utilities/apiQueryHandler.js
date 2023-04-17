class APIQueryHandler {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
  
    filterDocs() {
      const queryObj = { ...this.queryString };
  
      ['sort', 'page', 'limit', 'field'].forEach((el) => delete queryObj[el]);
  
      const queryStr = JSON.stringify(queryObj);
  
      this.query = this.query.find(JSON.parse(queryStr));
  
      return this;
    }
  
    sortDocs() {
      if (this.queryString.sort) {
        const criteria = this.queryString.sort.split(',').join(' ');
        this.query = this.query.sort(criteria);
      }
      return this;
    }
  
    limitFields() {
      if (this.queryString.field) {
        const criteria = this.queryString.sort.split(',').join(' ');
        this.query = this.query.select(criteria);
      }
      return this;
    }
  
    paginateDocs() {
      const limit = +this.queryString.limit || 20;
      const page = +this.queryString.page || 1;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
      return this;
    }
  }
  
  module.exports = APIQueryHandler;