export default{
    paginate(last_page,max_page,min_page,Page){
        max_page = Page + 2;
        min_page = Page - 2;
            if(Page >= last_page || max_page > last_page){
                max_page = last_page;
                min_page = last_page -4;
            }
            if(Page == 1 || Page == 2){
                max_page = 5;
                min_page = 1;
            }
        }
};