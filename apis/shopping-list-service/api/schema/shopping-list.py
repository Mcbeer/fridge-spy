from flask_marshmallow import Schema
from marshmallow.fields import Str


class ShoppingListSchema(Schema):
    class Meta:
        fields = ["id", "account_id", "items", "created_at", "updated_at"]

    id = Str()
    account_id = Str()
    items =
    created_at = Str()
    updated_at = Str()
