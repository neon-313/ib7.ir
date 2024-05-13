from ShopManageMent.models import CategoryThree,CategoryTwo,CategoryOne,Product,Inventory


def custom_context(request):
    cat_threes= CategoryThree.objects.all()
    cat_data =[]
    for cat_three in cat_threes:
        dic= {
            "title":cat_three.title,
            "id":cat_three.id,
            
        }
        cat_two_list=[]
        for cat_two in cat_three.cat_2.all():
            dic_cat_two={
                "id":cat_two.id,
                "title":cat_two.title,
               
            }

            cat_one_list=[]
            for cat_one in cat_two.cat_1.all():
                dic_cat_one={
                    "id":cat_one.id,
                    "title":cat_one.title,
                    
                }
                cat_one_list.append(dic_cat_one)
            dic_cat_two['cat_ones']=cat_one_list
            cat_two_list.append(dic_cat_two)

        dic["cat_twos"]=cat_two_list
        cat_data.append(dic)
    

    card_list= request.session.get("card_list")
    card_objects = []
    total_card_price = 0
    count_card= 0
    try:
        for card in card_list :
            product_object = Product.objects.get(product_code =card['product_code'])
            for inventory in card['inventorys']:
                count_card += 1
                inventory_object = Inventory.objects.get(id=inventory['inv_id'])
                pack_size_num =0
                for size in inventory_object.count_inventory.all():
                    pack_size_num+=1

                dic ={
                    
                    "product_code":product_object.product_code,
                    "product_title":product_object.title,
                    "price":product_object.price,
                    "quantity":inventory['quantity'],
                    "inventory_id" :inventory_object.id,
                    "color_code":inventory_object.color.color_code,
                    "color_name":inventory_object.color.name,
                    "price_per_card":int(product_object.price) * (int(inventory['quantity']) * int(pack_size_num) )


                }
                if product_object.main_image:
                    dic['product_image'] = product_object.main_image.url
                else:
                    dic['product_image'] = "#"
                card_objects.append(dic)
                total_card_price += int(product_object.price) * (int(inventory['quantity']) * int(pack_size_num) )
    except:
        pass

    return {"categorys":cat_data,"card_objects":card_objects,"total_card_price":total_card_price,"count_card":count_card}
    
            