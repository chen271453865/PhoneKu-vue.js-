export default {
    state: {
        count: 1,
        CnName:localStorage.getItem('newName'), //中文名
        nowPrice:localStorage.getItem('newPrice'),//股票当前价格
        turnover:localStorage.getItem('newTurnover'),//成交额
        generalCapital:localStorage.getItem('newGeneralCapital'),//总股本
        circulationCapital:localStorage.getItem('newCirculationCapital'),//流通股本
        selected:localStorage.getItem('newSelected'),//底部导航的选择跳转
        mkSum:1000, //当前米酷币
        // mkSum: localStorage.getItem('newbuySum')//购买后剩余的酷币
      },
      mutations: {
        increment (state) {
          // 变更状态
          state.count++
        },
        CnName (state,newName) {
          // 变更状态
          localStorage.setItem('newName',newName);
          state.CnName = localStorage.getItem('newName');
        },
        nowPrice (state,newPrice) {
          // 变更状态
          localStorage.setItem('newPrice',newPrice);
          state.nowPrice = localStorage.getItem('newPrice');
        },
        turnover (state,turnover) {
          // 变更状态
          localStorage.setItem('newTurnover',turnover);
          state.turnover = localStorage.getItem('newTurnover');
        },
        generalCapital (state,generalCapital) {
          // 变更状态
          localStorage.setItem('newGeneralCapital',generalCapital);
          state.generalCapital = localStorage.getItem('newGeneralCapital');
        },
        circulationCapital (state,circulationCapital) {
          // 变更状态
          localStorage.setItem('newCirculationCapital',circulationCapital);
          state.circulationCapital = localStorage.getItem('newCirculationCapital');
        },
        checkSum (state,buySum) {
          // 变更状态
          var s = this.state.stroe_data.mkSum - buySum;
          alert( s );
          localStorage.setItem('newbuySum',s);
          this.state.stroe_data.mkSum = localStorage.getItem('newbuySum');
        },
        selectChange (state,select) {
          // 变更状态
          
          state.selected = select;
          localStorage.setItem('newSelected',select);
        },
      }
}