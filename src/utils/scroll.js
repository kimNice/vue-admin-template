const scroll = {
    isEnd: false,
    start(callback) {
        let timer = null
        callback && window.addEventListener("scroll", () => {
            if (timer) {
                clearTimeout(timer)
            }
            //函数防抖
            timer = setTimeout(() => {
                //浏览器向上的滚动的高度
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
                //文档的真是高度
                const scrollHeight = document.documentElement.scrollHeight
                //窗口的可见高度
                const clientHeight = document.documentElement.clientHeight
                if(!this.isEnd && scrollHeight == scrollTop + clientHeight){
                    window.scrollTo(0, scrollTop - 100)
                    //请求数据
                    callback()
                }
            },300)
        })
    },
    end() {
        this.isEnd = true
    }
}
module.exports = scroll