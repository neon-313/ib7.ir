def convert_date_payed(date,price):
    cut_price = price / 4

    list_date = date.split('-')
    dic = {
        "year": list_date[0],
        "month":list_date[1],
        "day":list_date[2],
        "pey_price":cut_price,
    }

    first_peymant = {
        "year" : dic['year'],
        "month":dic['month'],
        "pey_price":cut_price,
    }
    if int(dic['day']) + 7 > 30:
        month_first_pey = int(first_peymant['month'])
        month_first_pey += 1 
        first_peymant['month']=month_first_pey
        sumery = int(dic['day']) + 7
        first_peymant['day'] = sumery - 30
    else:
        first_peymant['day'] = int(dic['day'])  + 7 


    two_peyment = {
        "year" : first_peymant['year'],
        "month":first_peymant['month'],
        "pey_price":cut_price,
    }
    if int(first_peymant['day']) + 7 > 30:

        month = int(two_peyment['month'])
        month += 1 
        two_peyment['month'] = month

        sumery = int(first_peymant['day']) + 7
        two_peyment['day'] = sumery - 30
    else:
        two_peyment['day'] = int(first_peymant['day'])  + 7 


    trhee_peyment = {
        "year" : two_peyment['year'],
        "month":two_peyment['month'],
        "pey_price":cut_price,
    }

    if int(two_peyment['day']) + 7 > 30:

        month = int(two_peyment['month'])
        month += 1 
        trhee_peyment['month'] = month

        sumery = int(two_peyment['day']) + 7
        trhee_peyment['day'] = sumery - 30
    else:
        trhee_peyment['day'] = int(two_peyment['day'])  + 7 



    four_peyment = {
        "year":trhee_peyment['year'],
        "month":trhee_peyment['month'],
        "pey_price":cut_price,
    }

    if int(trhee_peyment['day']) + 7 > 30:

        month = int(trhee_peyment['month'])
        month += 1 
        four_peyment['month'] = month

        sumery = int(two_peyment['day']) + 7
        four_peyment['day'] = sumery - 30
    else:
        four_peyment['day'] = int(trhee_peyment['day'])  + 7 
    return {
        "first_peymant":first_peymant,
        "two_peyment":two_peyment,
        "trhee_peyment":trhee_peyment,
        "four_peyment":four_peyment,
    }

