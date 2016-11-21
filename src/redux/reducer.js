/*
 reducerは、現在のstateとactionを受けて新しいstateを返すだけの純粋なメソッドです。
 */
var reducer = function (state={tasks:[]}, action) {
    console.log(action);
    switch (action.type) {
    case 'TASKS_LOADED':
        /*
         Object.assignを使用してstateのコピーを作成しています。
         第一引数の空のオブジェクトを新しい state としています。
         1. 空のオブジェクトに第二引数(state)をマージする。
         2. 第三引数をマージする。
         ※ Object.assignはES6の仕様です。実装されているブラウザは多くありません。polyfillかBabelを使用してください。
         */
        return Object.assign({},state,{tasks:action.data});
    default:
        return state;
    }
};

module.exports = reducer;
