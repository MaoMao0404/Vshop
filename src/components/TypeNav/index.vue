<template>
    <div class="type-nav">
        <div class="container" @mouseenter="enterShow" @mouseleave="leaveShow">
            <h2 class="all">全部商品分类</h2>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
            <!-- 过渡动画 -->
            <transition name="sort">
                <div class="sort" v-show="show">
                <div class="all-sort-list2" @click="goSearch">
                    <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId" @mouseleave="leaveIndex">
                        <h3 @mouseenter="changeIndex(index)" :class="{cur:currentIndex == index}" >
                            <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                        </h3>
                        <div class="item-list clearfix" :style="{display:currentIndex == index?'block':'none'}">
                            <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                <dl class="fore">
                                    <dt>
                                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                    </dt>
                                    <dd>
                                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                            <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                        </em>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </transition>
            
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from 'lodash/throttle'
export default {
    name:'TypeNav',
    data() {
        return {
            // 存储一级分类
            currentIndex:-1,
            // 三级联动列表的显示与隐藏
            show:true
        }
    },
    methods:{
        // 鼠标进入修改currentIndex数据
        changeIndex:throttle(function(index){
            // 操作太快会出现卡顿问题---防抖、节流
            this.currentIndex = index
        },50),
        // 鼠标移除修改currentIndex数据
        leaveIndex(){
            this.currentIndex = -1
        },
        // 路由跳转
        goSearch(event){
            // 事件委托+编程式导航
            // 事件委托存在问题
            // 1、点击a标签
            // 2.参数问题

            // 获取当前触发事件节点，节点属性dataset可以获取自定义属性与属性值
            let element = event.target
            let {categoryname,category1id,category2id,category3id} = element.dataset
            if (categoryname) {
                // 整理路由跳转参数
                let location = { name:"search" }
                let query = {categoryName:categoryname}
                if (category1id) {
                    query.category1Id = category1id
                }else if(category2id){
                    query.category2Id = category2id
                }else{
                    query.category3Id = category3id
                } 
                // 整理参数
                 location.query = query
                //判断有无params参数，如果有params将参数合并传递 
                if (this.$route.params) {
                    // 整理参数
                    location.params = this.$route.params
                }
                // 路由跳转
                this.$router.push(location)
            }   
        },
        // 鼠标移入 三级联动出现
        enterShow(){
             if (this.$route.path !== '/home'){
                this.show = true
             }
        },
        // 鼠标移除 三级联动隐藏
        leaveShow(){
            if (this.$route.path !== '/home') {
                this.show = false
            }
        }
    },
    mounted(){
        // 组件挂载完毕 判断路由
        // 如果不是Home组件，将typeNav隐藏
        if (this.$route.path !== '/home') {
             this.show = false
        }
       
    },
    computed:{
        ...mapState({
            categoryList:state=> state.home.categoryList
        })
    }

}
</script>

<style lang="less" scoped>
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                text-decoration: none;
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        // &:hover {
                        //     .item-list {
                        //         display: block;
                        //     }
                        // }
                    }
                     .cur {
                        background-color: #eee
                    } 
                }
            }
            // 过渡动画(进入开始状态)
            .sort-enter{
                height: 0px;
            }
            // 过渡动画(进入状态)
            .sort-enter-to{
                height: 461px;
            }
            .sort-enter-active{
                transition: all .5s;
            }
           
        }
    }
</style>