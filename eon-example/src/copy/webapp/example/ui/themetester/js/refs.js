refs = this.refs || {}
paths = this.paths || {}
paths.section = "section/";
paths.example = "example/";

refs.initialize = function(){
    // Store useful nodes references
    refs.tree = document.querySelector(".tTree");
    refs.view = document.querySelector("#tViewContent");
}