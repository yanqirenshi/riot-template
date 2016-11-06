# 概要

[riot](https://github.com/riot/riot) を使ってシングルページアプリケーションを構築するためのテンプレートです。

## 解決したい問題

サインイン、サンインアウト、サインアップを都度作るのが面倒なのでそのテンプレートです。

# サイトマップ

| url                                                       | 概要                                                      |
|-----------------------------------------------------------|-----------------------------------------------------------|
| [/](./doc/screen/root-with-user.md)  (with sign in)       | サインインしている時のルート                              |
| [/](./doc/screen/root-without-user.md)  (without sign in) | サインインしていない時のルート                            |
| [/sign/in](./doc/screen/sing-in.md)                       | サインインページ                                          |
| [/sign/out](./doc/screen/sing-out.md)                     | サインアウトページ                                        |
| [/sign/up](./doc/screen/sing-up.md)                       | サインアップページ。 Google, Facebook, Twitter などと連携 |

# Dependency

| elements                                                             | description |
|----------------------------------------------------------------------|-------------|
| [redux](https://github.com/reactjs/redux)                            |             |
| [riot-routehandler](https://github.com/crisward/riot-routehandler)   |             |
| [bulma](http://bulma.io)                                             |             |
| [Fetch API](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API) |             |
| [ES2015 (ES6)](http://qiita.com/tuno-tky/items/74ca595a9232bcbcd727) |             |

詳細は [dependencies.md](./doc/dependencies.md) 参照。
