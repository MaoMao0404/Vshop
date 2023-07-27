<template>
  <div class="pagination">
    <button :disabled="pageNo===1" @click="$emit('getPageNo', pageNo-1)" class="change">上一页</button>

    <button v-show="startNumAndEndNum.start > 1"  @click="$emit('getPageNo', 1)" :class="{active:pageNo===1}" class="change">1</button> 
    <button v-show="startNumAndEndNum.start > 2">···</button>

    <button 
        v-for="(page, index) in startNumAndEndNum.end" 
        :key="index" 
        v-show="page >= startNumAndEndNum.start" 
        @click="$emit('getPageNo',page)"
        :class="{active: pageNo===page}"
        class="change"
    >
        {{page}}
    </button>

    <button v-show="startNumAndEndNum.end < totalPage-1">···</button>
    <button v-show="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo',totalPage)" :class="{active: pageNo===totalPage}" class="change">{{totalPage}}</button>

    <button :disabled="pageNo===totalPage" @click="$emit('getPageNo', pageNo+1)" class="change">下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props:['pageNo','pageSize','total','continues',],
  computed:{
    // 总共多少页
    totalPage(){
        return Math.ceil(this.total/this.pageSize)
    },
    // 计算连续页码：起始页码和结束页码
    startNumAndEndNum(){
        let start = 0 
        let end = 0
        if (this.continues > this.totalPage) {
            start = 1
            end = this.totalPage
        } else{
            start = this.pageNo - parseInt(this.continues / 2)
            end = this.pageNo + parseInt(this.continues / 2)
            if (start < 1) {
                start = 1
                end = this.continues
            }
            if (end > this.totalPage) {
                end = this.totalPage
                start = this.totalPage - this.continues + 1
            }
        }
        return {start, end}
    }
  },
  methods:{

  }
};
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #e1251b;
      color: #fff;
    }
  }
  .change:hover{
    background-color: #e1251b;
    color: #fff;
  }

}
</style>
