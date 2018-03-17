Technologies
MongoDB version : 3.4.7
NodeJS version : 8.4.0

Note : Since this project is built using Express generator : command "npm start"  or "node ./bin/www " will start the application


APIs

1)Add Category
url : (POST) localhost:3000/api/category/add

Request object :  application/json

i)name : string,required - name of the category
ii)slug : string,required - category slug(will be converted into lowercase)
iii)parent_category_slug : string - slug of the parent category,should be used if creating sub category(will be converted into lowercase)

2)List Categories(with child categories)		
url : (GET)localhost:3000/api/category/

3)Add Product
url : (POST)localhost:3000/api/product/add
Request object :  application/json

i)name : string,required - name of the product
ii)price : float,required - price of the product(will consider upto 2 decimals)
iii)quantity : numeric,required - absolute quantity 
iv)categories : array,required -array of valid category slug

4)Update product
url : (PATCH)localhost:3000/api/product/{product_id}
Request object :  application/json

i)name : string,required - name of the product
ii)price : float,required - price of the product(will consider upto 2 decimals)
iii)quantity : numeric,required - absolute quantity 
iv)categories : array,required -array of valid category slug

5)Get Product by a category
url :  (GET)localhost:3000/api/product/{category-slug}
If not valid category will return empty array