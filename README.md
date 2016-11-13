# 概要

[riot](https://github.com/riot/riot) を使ってシングルページアプリケーションを構築するためのテンプレートです。

__TODO__

- Redux
  1. [Riot and Redux - Part 2](https://youtu.be/DgM03bvgCYc)
  1. [Riot and Redux - Part 3](https://youtu.be/QuwnbuneAzM)
  1. [Riot and Redux - Part 4](https://youtu.be/qc6bjtu7KG0)
  1. [Riot and Redux - Part 5](https://youtu.be/M4BNsRMatVY)
  1. [Riot and Redux - Part 6](https://youtu.be/jr8KDpwtRsk)
- Router
  1. [riot-routehandler](https://github.com/crisward/riot-routehandler)
- Ajax
  1. [Riot.jsでAjaxではなくFetchを使って標準的なやりかたでAPIを取得する](http://qiita.com/aggre/items/c36d8fe34551569e2e6f)
- Sign-In/Sign-Out
  1. Planning

## 解決したい問題

サインイン、サンインアウト、サインアップを都度作るのが面倒なのでそのテンプレートです。

# 使い方

## インストール

```shell-session
npm i
```

## 実行

```shell-session
npm run dev
```

# サイトマップ

| url                                                       | 概要                                                      |
|-----------------------------------------------------------|-----------------------------------------------------------|
| [/](./doc/screen/root-with-user.md)  (with sign in)       | サインインしている時のルート                              |
| [/](./doc/screen/root-without-user.md)  (without sign in) | サインインしていない時のルート                            |
| [/sign/in](./doc/screen/sing-in.md)                       | サインインページ                                          |
| [/sign/out](./doc/screen/sing-out.md)                     | サインアウトページ                                        |
| [/sign/up](./doc/screen/sing-up.md)                       | サインアップページ。 Google, Facebook, Twitter などと連携 |

# Dependency

| elements                                                             | description        |
|----------------------------------------------------------------------|--------------------|
| [redux](https://github.com/reactjs/redux)                            | Riot 本体          |
| [riot-routehandler](https://github.com/crisward/riot-routehandler)   | ルーター           |
| [bulma](http://bulma.io)                                             | CSS フレームワーク |
| [Fetch API](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API) | Http Request       |
| [ES2015 (ES6)](http://qiita.com/tuno-tky/items/74ca595a9232bcbcd727) | ECMAScript         |

詳細は [dependencies.md](./doc/dependencies.md) 参照。
