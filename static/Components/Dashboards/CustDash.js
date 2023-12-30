export default {
    props : ['data'],
    template: `<div>
        Welcome Home {{ $route.query.role }}
    </div>`
}