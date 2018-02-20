# 概要

[riot](https://github.com/riot/riot) を使ってシングルページアプリケーションを構築するためのテンプレートです。

置くだけて使えます。

## 解決したい問題

シンプルかつ速やかにWEBページを書きたいだけなんです。

「コンパイルはしません。」とか言っていましたが、多少心を入れ変えました。

最低限度はしようか、という気になってきました。

# 使い方

## 実行

nginx.conf とかに追加するだけで動きます。

```js
location /riot/ {
    alias c:/your/deploy/path/;
}
```

# サイトマップ

| url                                                       | 概要                                                      |
|-----------------------------------------------------------|-----------------------------------------------------------|
| [/](./doc/screen/root-with-user.md)  (with sign in)       | サインインしている時のルート                              |
| [/](./doc/screen/root-without-user.md)  (without sign in) | サインインしていない時のルート                            |
| [/sign/in](./doc/screen/sing-in.md)                       | サインインページ                                          |
| [/sign/out](./doc/screen/sing-out.md)                     | サインアウトページ                                        |

# Dependency

| elements                                                               | description        |
|------------------------------------------------------------------------|--------------------|
| [redux](https://github.com/reactjs/redux)                              | Riot 本体          |
| [bulma](http://bulma.io)                                               | CSS フレームワーク |
| [ES2015 (ES6)](http://qiita.com/tuno-tky/items/74ca595a9232bcbcd727)   | ECMAScript         |

# Todo

- [ ] /sign/in
- [ ] /sign/out
- [ ] /sign/d3/jobnet
- [ ] /sign/d3/guntt
