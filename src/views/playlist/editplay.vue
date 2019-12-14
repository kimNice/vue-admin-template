<template>
  <div v-loading="loading">
    <el-form ref="form" v-model="playlist" label-width="80px">
      <el-form-item label="歌单名称">
        <el-input v-model="playlist.name"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="playlist.copywriter"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">更新</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getPlaylistEdit,setEdit} from '../../api/playlist'
export default {
  name: 'Editplay',
  data(){
    return {
      playlist:[],
      loading:false
    }
  },
  created(){
    this.loading = true
    getPlaylistEdit({id:this.$route.params.id}).then(res =>{
      this.playlist = res.data
      this.loading = false
    })
  },
  methods:{
    onSubmit(row){
     this.loading = true
      setEdit(this.playlist).then( res =>{
        console.log("回访",res)
        if(res.data.modified>0){
            this.$message({
              message:'更新成功',
              type:'success'
            })
        }else{
          this.$message.error("更新失败")
        }
        this.loading = false
        this.$router.push("/playlist/playlist")
      })
    },
    onCancel(){
      this.$router.push("/playlist/playlist")
    }
  }
}
</script>

<style scoped>

</style>
