export const SORT = {
  sortBy: {
    CREATED_AT: "createdAt",
    TOTAL_VIEWS: "totalViews",
    POST_UPDATE_DATE: "postUpdateDate",
    get(index) {
      if (index === 0) return this.CREATED_AT
      if (index === 1) return this.TOTAL_VIEWS
      return this.POST_UPDATE_DATE
    }
  },
  sortOrder: {
    DESC: "DESC",
    ASC: "ASC",
    toggleSortOrder(order) {
      return (order === this.DESC) ? this.ASC : this.DESC
    }
  }
}
