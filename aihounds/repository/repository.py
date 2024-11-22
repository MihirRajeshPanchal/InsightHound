from typing import Generic, TypeVar, Optional, Any, Dict
from pymongo import MongoClient
from pymongo.collection import Collection
from pymongo.errors import PyMongoError
import json
from aihounds.models.user import User, PyObjectId
from aihounds.models.company import Company
import os
from dotenv import load_dotenv
load_dotenv()
T = TypeVar('T')
K = TypeVar('K')

DB_URL=os.getenv('DATABASE_URL')
class MongooseRepository(Generic[T, K]):
    def __init__(self, model: T, collection_name: str, db_name: str = 'insight-hound-test', uri: str =DB_URL):
        self.client = MongoClient(uri)
        self.db = self.client[db_name]
        self.collection: Collection = self.db[collection_name]

    def create(self, model: T) -> Optional[K]:
        try:
            data = model.dict()
            result = self.collection.insert_one(data)
            return result.inserted_id
        except PyMongoError as e:
            print(f"Create Error: {e}")
            return None

    def create_if_not_exists(self, model: T, unique_column: str, unique_value: Any) -> Optional[K]:
        try:
            existing_data = self.collection.find_one({unique_column: unique_value})
            if existing_data:
                return existing_data

            data = model.dict()
            result = self.collection.insert_one(data)
            return result.inserted_id
        except PyMongoError as e:
            print(f"Create Error: {e}")
            return None

    def get_by_id(self, _id: str) -> Optional[K]:
        try:
            from bson import ObjectId
            data = self.collection.find_one({'_id': ObjectId(_id)})
            return data
        except PyMongoError as e:
            print(f"Get Error: {e}")
            return None

    def get_by_query(self, column_name: str, value: Any) -> Optional[K]:
        try:
            data = self.collection.find_one({column_name: value})
            return data
        except PyMongoError as e:
            print(f"Get Error: {e}")
            return None

    def update_by_id(self, _id: str, model: T):
        try:
            from bson import ObjectId
            data = model.dict(exclude_unset=True)
            result = self.collection.update_one({'_id': ObjectId(_id)}, {'$set': data})
            return {"response": "success"} if result.modified_count > 0 else None
        except PyMongoError as e:
            print(f"Update Error: {e}")
            return None

    def append_to_props(self, _id: str, new_props: Dict[str, Any]):
        try:
            from bson import ObjectId
            existing_data = self.collection.find_one({'_id': ObjectId(_id)})
            if not existing_data:
                print(f"No document found with id: {_id}")
                return None

            props = json.loads(existing_data.get('props', '{}'))

            props.update(new_props)

            updated_props = json.dumps(props)

            result = self.collection.update_one({'_id': ObjectId(_id)}, {'$set': {'props': updated_props}})
            return {"response": "success"} if result.modified_count > 0 else None
        except PyMongoError as e:
            print(f"Append to Props Error: {e}")
            return None

    def close(self):
        self.client.close()