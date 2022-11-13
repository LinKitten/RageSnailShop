// components/Tabs/Tabs.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tabs:{
            type:Array,
            value:[]
          }
    },

    /**
     * 组件的初始数据
     */
    data: {
       
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleItemTap(e){
            console.log(e);
            const { index } = e.currentTarget.dataset;
            // 触发父组件中的自定义数据
            this.triggerEvent("tabsItemChange",{index})
        }
    }
})
