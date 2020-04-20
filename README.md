# chat-space DB 設計
## users テーブル
| Column   | Type   | Options     |
| -------- | ------ | ----------- |
| name     | string | null: false |
| email    | string | null: false |
| password | string | null: false |
### Association
- has_many :groups, through: :groups_users
- has_many :messages
- has_many :groups_users

## messages テーブル
| Column   | Type    | Options     |
| -------- | ------- | ----------- |
| body     | text    | null: false |
| image    | string  |             |
| user_id  | integer | null: false, foreign_key: true|
| group_id | integer | null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## group テーブル
| Column     | Type   | Options     |
| ---------- | ------ | ------------|
| group_name | string | null: false |
### Association
- has_many :users, through: :groups_users
- has_many :messages
- has_many :groups_users

## groups_users テーブル
| Column   | Type    | Options      |
| -------- | ------- | ------------------------------ |
| user_id  | integer | null: false, foreign_key: true |
| group_id | integer | null: false, foreign_key: true |
### Association
- belongs_to :group
- belongs_to :user

