use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Replace the sample below with your own migration scripts
        todo!();

        manager
            .create_table(
                Table::create()
                    .table(ShoppingListItem::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(ShoppingListItem::Id)
                            .uuid()
                            .not_null()
                            .primary_key(),
                    )
                    .col(
                        ColumnDef::new(ShoppingListItem::list_id)
                            .foreign_key("shopping_list.id")
                            .not_null(),
                    )
                    .col(ColumnDef::new(ShoppingListItem::item_id).uuid().not_null())
                    .col(ColumnDef::new(ShoppingListItem::Text).string().not_null())
                    .to_owned(),
            )
            .await
        //             id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        //   shopping_list_id uuid NOT NULL REFERENCES shopping_list(id),
        //   item_id uuid NOT NULL,
        //   amount int DEFAULT 1,
        //   manually_added bool DEFAULT false
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Replace the sample below with your own migration scripts
        todo!();

        manager
            .drop_table(Table::drop().table(Post::Table).to_owned())
            .await
    }
}

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden)]
enum Post {
    Table,
    Id,
    Title,
    Text,
}
