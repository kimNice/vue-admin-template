<template >
<div>
  <el-table
    v-loading.fullscreen.lock="loading"
    element-loading-text="加载中"
    :data="playList"
    style="width: 100%"
    stripe>
    <el-table-column
     type="index"
      label="编号"
      width="50">
      
    </el-table-column>
    <el-table-column width="100" label="图标">
    <template slot-scope="scope">
        <img :src="scope.row.picUrl" alt height="50"/>
    </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="名称"
      >
    </el-table-column>
    <el-table-column
      prop="copywriter"
      label="描述"
      >
    </el-table-column>
    <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="onEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
  </el-table>
   <!-- 确认删除的对话框 -->
    <el-dialog title="提示" :visible.sync="delDialogVisible" width="30%">
      <span>确定删除该歌单吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>
</div>
</template>

<script>
import {fetchList,deleteId} from '@/api/playlist.js'
import scroll from '../../utils/scroll'
export default {
  name: 'Playlist',
  data(){
    return {
      playList:[],
      count:50, //请求条数
      loading:false,
      delDialogVisible:false,
      deleteId:'',
    }
  },
  created(){
    this.getList()
  },
  mounted(){
    //调用下拉刷新组件
    scroll.start(this.getList)
    
  },
  methods:{
    getList(){
      this.loading =true
      fetchList({
        start:this.playList.length,
        count:this.count
      }).then((res)=>{
        console.log(res)
        this.playList  =  this.playList.concat(res.data)
        //如果数据库返回的数组小于总条数，那就说明数据库没值了
        if(res.data.length<this.count){
          //关掉下拉刷新组件
          scroll.end()
        }
        this.loading = false
      }).catch(()=>{
        this.loading = false
      })
      
    },
    
    onEdit(index) {
        let a_id = index._id
        this.$router.push(`/playlist/editplay/${a_id}`)
    },
    onDel(index, row) {
        this.deleteId = index._id
        this.delDialogVisible = true
    },
    doDel(row){
      this.delDialogVisible = false
      
      deleteId({id:this.deleteId}).then( res =>{
          if(res.data.deleted>0){
            this.playList = []
            this.$message({
              message:"删除成功",
              type:'success'
            })
            this.getList()
            
          }else{
            this.$message.error("删除失败")
          }
          
          
      })
    },
  }
}
</script>

<style scoped>
 
</style>
