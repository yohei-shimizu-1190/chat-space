# chat-space DB 設計
## users テーブル
| Column   | Type   | Options     |
| -------- | ------ | ----------- |
| name     | string | null: false |
| email    | string | null: false |
| password | string | null: false |
### Association
- has_many :groups, through: :group_users
- has_many :messages
- has_many :group_users

## messages テーブル
| Column   | Type    | Options     |
| -------- | ------- | ----------- |
| content  | string    | null: false |
| image    | string  |             |
| user_id  | references | null: false, foreign_key: true|
| group_id | references | null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## group テーブル
| Column     | Type   | Options     |
| ---------- | ------ | ------------|
| group_name | string | null: false |
### Association
- has_many :users, through: :group_users
- has_many :messages
- has_many :group_users

## group_users テーブル
| Column   | Type    | Options      |
| -------- | ------- | ------------------------------ |
| user_id  | integer | null: false, foreign_key: true |
| group_id | integer | null: false, foreign_key: true |
### Association
- belongs_to :group
- belongs_to :user

