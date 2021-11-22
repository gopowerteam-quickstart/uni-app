import 'vue'
declare module 'vue' {
    type Hooks = App.AppInstance & Page.PageInstance
    interface ComponentCustomOptions extends Hooks {}
}

declare module 'uview-ui' {
    export default ''
}
