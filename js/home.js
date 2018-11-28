(function(doc, win) {

    var docEl = doc.documentElement,

        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',

        recalc = function() {

            var clientWidth = docEl.clientWidth;

            if (!clientWidth) return;

            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';

            /*docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';*/

        };

    if (!doc.addEventListener) return;

    win.addEventListener(resizeEvt, recalc, false);

    doc.addEventListener('DOMContentLoaded', recalc, false);

})(document, window);
// window.onload=function(){
//     let scroll = new BScroll(document.getElementById('wrapper'),{
//         scrollY: true, 
//         scrollX: false, 
//      })
//      scroll.goToPage(0,3,100)
// }
let app = new Vue({
    el:"#box",
    data(){
        return{
            listHeight:[],
            scrollY:0,
        }
    },
    mounted()  {
        this._initScroll();
        this._calculateHeight();
    },
     computed:{
        currentIndex(){
          for(let i=0;i<this.listHeight.length;i++){
            let height1=this.listHeight[i];
            let height2=this.listHeight[i+1];
            if(!height2 || this.scrollY >= height1 && this.scrollY < height2){
            return i;
            }
          }
          return 0;

        }
    },
    methods:{
        _initScroll(){
          this.foodsScroll=new BScroll(this.$refs.wrapper,{
            probeType:3,
            click:true,
            scrollY:true
          });
          this.foodsScroll.on('scroll',(pos)=>{
            this.scrollY=Math.abs(Math.round(pos.y))
          })
        },
        _calculateHeight(){
          let foodList=this.$refs.wrapper.getElementsByClassName("section");
          let height=0;
          this.listHeight.push(height);
          for(let i=0;i<foodList.length;i++){
            let item=foodList[i];
            height+=item.clientHeight;
            this.listHeight.push(height);
          }
          console.log(this.listHeight)
        },
        selectMenu(index,event){
            if(!event._constructed){
              return;
            }
            let foodList=this.$refs.foodWrapper.getElementsByClassName('foot-list-hook');
            let el=foodList[index];
            this.foodsScroll.scrollToElement(el,300)
        },
    }
})