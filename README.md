* 概要

[riot](https://github.com/riot/riot) を使ってシングルページアプリケーションを構築するためのテンプレートです。

* サイトマップ

| url                    | 概要                                                      |
|------------------------|-----------------------------------------------------------|
| `/`  (with sign in)    | サインインしている時のルート                              |
| `/`  (without sign in) | サインインしていない時のルート                            |
| `/sign/in`             | サインインページ                                          |
| `/sign/out`            | サインアウトページ                                        |
| `/sign/up`             | サインアップページ。 Google, Facebook, Twitter などと連携 |

* Dependency

** Redux

- [redux](https://github.com/reactjs/redux)

** Router
以下の二つのどちらかを利用しよう。

- [riot-routehandler](https://github.com/crisward/riot-routehandler)
- [rg-router](https://github.com/RiotGear/rg-router)
