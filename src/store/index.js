import Vue from 'vue'
import Vuex from "vuex"
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        editableTabs: JSON.parse(window.sessionStorage.getItem('tabs')) || [{
            title: '首页',
            name: '0',
            path: 'welcome'
          }
          ]
    },
    mutations:{
        changeEditTab(state, o){
            let oldTabs = window.sessionStorage.getItem('tabs')
            if(oldTabs){
                // 说明有
                state.editableTabs = JSON.parse(oldTabs)
            }
            //更新tab标签数据 当openration.operantion = a  添加  r移除
            // o.name = state.editableTabs.length ++
            if(o.operation == 'a'){
                // console.log(o)
                let res = state.editableTabs.some(item=>item.title == o.title)
                if(res){
                    //说明已经有这个了
                    // console.log(o)
                    return
                }else{
                    // o[name] = state.editableTabs.length ++
                    state.editableTabs.push(o)
                }
            }else{
                state.editableTabs.splice(o, 1)
                console.log('remove')
                // console.log(o)
            }
            window.sessionStorage.setItem('tabs', JSON.stringify(state.editableTabs))
        }
    },
    actions:{},
    getters:{}
})
