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

## Redux

- [redux](https://github.com/reactjs/redux)

## Router
以下の二つのどちらかを利用しよう。

- [riot-routehandler](https://github.com/crisward/riot-routehandler)
- [rg-router](https://github.com/RiotGear/rg-router)

## CSS

- [bulma](http://bulma.io)

## Http request

[Fetch API](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API) を利用します。

- [Fetch 概説](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch)
- [お疲れさまXMLHttpRequest、こんにちはfetch](http://qiita.com/tomoyukilabs/items/9b464c53450acc0b9574)

## 他
- [ES2015 (ES6)](http://qiita.com/tuno-tky/items/74ca595a9232bcbcd727) で書きます。
- [jQuery](https://jquery.com)は利用しません。
