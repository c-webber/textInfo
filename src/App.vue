<template>
  <div id="app">
    <p class='article' @mouseup="addTip" @click='show'>{{b}}</p>
    <ul>
      <li v-for="item in a" :key="item.location">
        错误： {{item.location}}，
        批注：{{item.annotation}} 
        <button @click='delTip(item.location)'>删除</button>
      </li>
    </ul>
    <div class='showBox' :style='[mouse]' v-if="c">
      add annotation?<br>
      <button @click='close'>no</button>
      <button @click='next'>yes</button>
    </div>
    <div class='addMas' :style='[mouse]' v-if="add">
      <p class='tip'>{{this.ready}}</p>
      <p>批注：<input type="text" ref='input'></p>
      <button @click='tip'>取消</button> 
      <button @click='addMassage'>确定</button>
    </div>
    <div class='showTip' :style='[mouse]' v-if="showT" @click="hide">
      <p class='tip'>{{this.Stip.location}}</p>
      <p>批注 : {{this.Stip.annotation}}</p>
      <button @click='del'>删除</button> 
      <button @click='change'>修改</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      a : [],
      b : this.$store.state.article,
      c : false,
      add : false,
      ready : "",
      mouse : {},
      select : null,
      showT : false,
      Stip : {
        location : "",
        annotation : ""
      },
      targetSpan : null
    }
  },
  methods:{
    addTip(event){
      const str = window.getSelection().toString()
      console.log(str.trim())
      if(str.trim() && !this.a.map(item=>item.location).includes(str)){
        this.select = window.getSelection().getRangeAt(0)
        this.ready = str
        this.c = true
        this.mouse.top = event.offsetY + 10 + "px"
        this.mouse.left = event.offsetX + "px"
      }
    },
    show(event){
      if(event.target.tagName == 'SPAN'){
        this.targetSpan = event.target
        this.mouse.top = event.offsetY + 10 + "px"
        this.mouse.left = event.offsetX + "px"
        this.showT = true
        this.Stip.location = event.target.innerText
        var self = this
        this.a.forEach(item=>{
          if(item.location == event.target.innerText) self.Stip.annotation = item.annotation
        })
      }
    },
    close(){
      this.c = false
    },
    next(){
      this.c = false
      this.add = true
    },
    tip(){
      this.add = false
    },
    addMassage(){
      let sp = document.createElement("span")
      if(/\s/.test(this.ready)){
        sp.className = 'long'
      }else{
        sp.className = 'tip'
      }
      sp.setAttribute('datainfo',this.ready)
      sp.appendChild(this.select.cloneContents())
      // 使用surroundContents有bug 
      this.select.deleteContents()
      this.select.insertNode(sp)
      this.a.push({
        location : this.ready,
        annotation : this.$refs.input.value
      })
      this.add = false
    },
    hide(){
      this.showT = false
    },
    del(){
      var rep = this.targetSpan.innerHTML
      this.targetSpan.insertAdjacentHTML('beforeBegin',rep)
      // this.targetSpan.parentNode.removeChild(this.targetSpan)
      this.a = this.a.filter(item => item.location != this.targetSpan.getAttribute('datainfo'))
    },
    change(){
      console.log(this.targetSpan)
    },
    delTip(location){
      var spans = document.querySelectorAll('.article span');
      for(let i = 0 ; i < spans.length ; i++){
        if(spans[i].getAttribute('datainfo') == location) this.targetSpan = spans[i]
      }
      this.del()
    }
  }
}
</script>

<style lang='scss'>
  span{
    cursor: pointer;
    &.long{
      color : orange;
      text-decoration:underline;
    }
    &.tip{
      color : red;
    }
  }
  .article{
   padding-top: 50px;
  }
  #app{
    position: relative;
    width : 800px;
    margin : 0 auto;
  }
  div{
    &.showBox{
      background: #aaa;
      text-align: center;
      width : 150px;
      height : 50px;
      border-radius: 15px;
      position: absolute;
    }
    &.addMas{
      width : 200px;
      height : 140px;
      text-align: center;
      background : #ccc;
      border-radius: 15px;
      position: absolute;
    }
    &.showTip{
      width : 200px;
      height : 130px;
      text-align: center;
      background : #ccc;
      border-radius: 15px;
      position: absolute;
    }
  }
</style>