<template>
  <div>
    <el-table v-loading="loading" :data="blogList" stripe>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="nickName" label="发布人"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 确认删除的对话框 -->
    <el-dialog title="提示" :visible.sync="delDialogVisible" width="30%">
      <span>确定删除该博客吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getList} from '../../api/blog.js'  
import scroll from '../../utils/scroll'
export default {
  name: 'Blog',
  data (){
    return {
      blogList:[],
      loading:false,
      count:50,
      delDialogVisible:false
    }
  },
  created(){
    this.getBlogList()
  },
  mounted(){
    scroll.start(this.getBlogList)
  },
  methods:{
    getBlogList(){
      this.loading = true
      getList({
        start:this.blogList.length,
        count:this.count
      }).then( res => {
        
        let data = []
        for(let i=0;i<res.data.data.length;i++){
          data.push(JSON.parse(res.data.data[i]))
        }
        this.blogList = this.blogList.concat(data)
        console.log(res)
        if(data.length < this.count){
          scroll.end()
        }
        this.loading = false
      })
    },
    onDel(row){
      console.log(row)
      this.delDialogVisible = true
    },

    doDel(){

    }
  }
}
</script>

<style scoped>

</style>
