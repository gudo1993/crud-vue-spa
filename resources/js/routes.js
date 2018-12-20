import VueRouter from 'vue-router';

let routes = [
    {
        path: "/",
        name: "Home",
        component: require("./views/Home")
    },
    {
        path: "/create",
        name: "Create",
        component: require("./views/Create")
    },
    {
        path: "/persons/:id",
        name: "person",
        component: require("./views/Person")
    }
];

export default new VueRouter({
    routes,
    linkActiveClass: 'active'
});
