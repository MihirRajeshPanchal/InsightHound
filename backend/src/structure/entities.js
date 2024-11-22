
export const userEntity = {
  name: 'user',
  attributes: [
  {
    "name": "email",
    "type": "string",
    "constraint": {
      "type": "unique"
    }
  },
  {
    "name": "password",
    "type": "string"
  },
  {
    "name": "props",
    "type": "string"
  }
]
};
    

export const companyEntity = {
  name: 'company',
  attributes: [
  {
    "name": "name",
    "type": "string"
  },
  {
    "name": "description",
    "type": "string"
  },
  {
    "name": "vision",
    "type": "string"
  },
  {
    "name": "mission",
    "type": "string"
  },
  {
    "name": "props",
    "type": "string"
  }
]
};
    
export default { userEntity, companyEntity };