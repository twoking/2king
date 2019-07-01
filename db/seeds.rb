def setup_friendships(user_email)
  # TODO make this users list constant
  tester_user = User.find_by(email: user_email)
  second_user = User.all[1]
  third_user = User.all[2]
  last_user = User.last

  tester_user.follow(second_user)
  tester_user.follow(third_user)

  second_user.follow(third_user)
  third_user.follow(last_user)
end

def setup_restos
  Restaurant.create!(
    name: "Pizza Fabbrica",
    address: "Jl. Batu Mejan, Canggu, Kec. Kuta Utara, Kabupaten Badung, Bali 80351, Indonesia",
    phone_number: "0819-9933-0880",
    website: "http://pizzafabbrica.com/",
    latitude: -8.652445,
    longitude: 115.130769,
    place_id: "ChIJf_dTwXk40i0R4f3nJ34ReEo",
    price_level: nil,
    photos:
    ["https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAjCEUvcC4CVv3LYLFPBsIROSEUTyMHA9oIqdoLiWO2skPtUziHJzP1gV2B37mIm3Z3BeQJTt9Icfzx8q03SKWAzL6CUPkwZUSIqUKkURvuRKAyOPZd0I5AgXgqIBK2pdUEhCykTkDAXWeW0zRWd_hpfjfGhSN_E0fsNONjCJDgDXf25gYVyUESQ&key=AIzaSyAwvBJlD1AlfTMOXP2IZdAD8SIVvi_GEjM",
     " https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAJ9tzJD4QlfdSTr5LGFjc8Mnd5zMGPpt6ovoCwXkoYV66F67dEYFKbNQugi2RTpjXGEf3Mhwi3TylGwEVOw2SJaZgPJshFb15Fqo_qa1423S1Of50feUdYD53og6TzkxuEhAybyUyNBebo3uo87RH80YIGhRRnTyA0r5zB5UVcbexUS7yABQSvA&key=AIzaSyAwvBJlD1AlfTMOXP2IZdAD8SIVvi_GEjM",
     " https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAALpz5_DzZO_jVd0GHtWU_VAbEUahHU_QnxivlWaFCwmBfn0nFmeoEM6wSjA1TXD08VsxRxlIyu5BXH-PjAkgMK5OoJ1RF91J9jhV28Dq_Ftbidl2ZlGevaSqCiM6e-_S8EhAZo6PO7U71u02wKhMtHmpDGhSbyZCPi_8CgkQfzSlGqRbADXLvtQ&key=AIzaSyAwvBJlD1AlfTMOXP2IZdAD8SIVvi_GEjM"],
     opening_hours:
     ["Monday: 10:00 AM – 12:00 AM",
       "Tuesday: 10:00 AM – 12:00 AM",
       "Wednesday: 10:00 AM – 12:00 AM",
       "Thursday: 10:00 AM – 12:00 AM",
       "Friday: 10:00 AM – 12:00 AM",
       "Saturday: 10:00 AM – 12:00 AM",
       "Sunday: 10:00 AM – 12:00 AM"]
       )

  Restaurant.create!(
    name: "The Shady Shack",
    address: "Jl. Tanah Barak No.57, Canggu, Kec. Kuta Utara, Kabupaten Badung, Bali 80351, Indonesia",
    phone_number: "0819-1639-5087",
    website: "https://the-shady-shack.business.site/",
    latitude: -8.6515167,
    longitude: 115.131465,
    place_id: "ChIJH6Xg6nk40i0RkpnxaV9yCWs",
    price_level: nil,
    photos:
    ["https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAV6Tx3PqMQviMqw0_sfh3ktjrVojdbaDmK50Zpf_twNRGmk1BACymrGmiptPtEyh5o3I0QPpZ9sPh-sQhNS8Pig82HYKnsniZreq2MXQHq_zV7ICQ7391Kfz2A7m2ixc1EhCmOfGy63GU07Qjc13FRgx1GhR6zf__Lmjqso_Xp6ZM5Qx9xJD0Pw&key=AIzaSyAwvBJlD1AlfTMOXP2IZdAD8SIVvi_GEjM",
     " https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAYJB8R2S4fPgVWFtdTK4MI5dXBnZJAMe8Z3FrWeCdOucObJD3qoIp8XL0q9RqzPlgpGS2McAh3Sn-rJg2KOpmEYS7oETnefeyyyaQYNdYQthRhr4IUPhXv16VbeANQtkBEhB7w2nlfENZnNFMz4Ty1SAQGhSOWtmujGb_FqaZ8apmeCGWmApYag&key=AIzaSyAwvBJlD1AlfTMOXP2IZdAD8SIVvi_GEjM",
     " https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAadbteh4oZCzKnXlThhxp2FLt-ol3JEB-1R5HshvY9Ndxket1ZE_d8794ST2xlMRaG106YoSlOtUq4ePLbqpB8ZHO2RQ_g2j_CM_0MdZuLIA8Wd9Ci9QP09Grt-kk1J4MEhD_5vVs8JaJt-HbdXGtpnAPGhQ4W_g0vzCdmQPXhFF8jLnE-G1uSw&key=AIzaSyAwvBJlD1AlfTMOXP2IZdAD8SIVvi_GEjM"],
     opening_hours:
     ["Monday: 7:30 AM – 10:30 PM",
       "Tuesday: 7:30 AM – 10:30 PM",
       "Wednesday: 7:30 AM – 10:30 PM",
       "Thursday: 7:30 AM – 10:30 PM",
       "Friday: 7:30 AM – 10:30 PM",
       "Saturday: 7:30 AM – 10:30 PM",
       "Sunday: 7:30 AM – 10:30 PM"]
       )

  Restaurant.create!(
    name: "Pretty Poison",
    address: "Jl. Subak Canggu, Canggu, Kec. Kuta Utara, Kabupaten Badung, Bali 80361, Indonesia",
    phone_number: "0812-4622-9340",
    website: "",
    latitude: -8.6527868,
    longitude: 115.1379469,
    place_id: "ChIJIa89_H440i0RYxnmQm7eXRM",
    price_level: nil,
    photos:
    ["https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAYxpMmTycA8P_KWj-OZASpf034dErA71dcWIKWwdVvDgoHUuB40d3TFmmwxk5fqHd3xkvv06FKOUnxnKwX7ejIuAIrKwhoVP77M7yulZviIkm1dcncuqM0hheMkXaTBC0EhCFYfRiCnZKm6o3XRmRphUYGhQJvYBmYa5ZOV9Jwn_gTBBPd2jC-A&key=AIzaSyAwvBJlD1AlfTMOXP2IZdAD8SIVvi_GEjM",
     " https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAA6dirADA_RwxZs_m6Qv8yCqNyjtqUGhgWJshpBJn-kXC_nmNmygpGMNKhi6hCA1bH2cHi3FYB_bPDT1tbTg_e9s0Ue6V9Uk_yg6Vy0cXcC-e5mOW_-F9W_XbwO19YM9G3EhByxcGH__1nB0vtjddokJMdGhTbMA9vw1pHO5veIWfHK79mk5GKbQ&key=AIzaSyAwvBJlD1AlfTMOXP2IZdAD8SIVvi_GEjM",
     " https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAWW2NAIdPds3TYT2UfhLwhSStTWAlXnLofa6NTESnEfbYX23t5UVaXVMtyNZFKc8IZ-OeZAgVKrs7R7dRZ5pKDRgzur_AHuW8iuSA9b0u5QoMJ6kxTg_RdTOkwveeCHakEhAe8oMviZZ2HgzBUz50Lo-lGhSt6k1p9rQlLQ1m2z5krWVx9q2lBg&key=AIzaSyAwvBJlD1AlfTMOXP2IZdAD8SIVvi_GEjM"],
     opening_hours:
     ["Monday: 4:00 PM – 12:00 AM",
       "Tuesday: 4:00 PM – 12:00 AM",
       "Wednesday: 4:00 PM – 12:00 AM",
       "Thursday: 4:00 PM – 12:00 AM",
       "Friday: 4:00 PM – 12:00 AM",
       "Saturday: 4:00 PM – 12:00 AM",
       "Sunday: 4:00 PM – 12:00 AM"]
       )

  Restaurant.create!(
    name: "Gypsy Kitchen+Bar",
    address: "Jalan Pura Batu Mejan, Gg. Munduk Catu No 1 Echo Beach Canggu, Canggu, Kec. Kuta Utara, Kabupaten Badung, Bali 80351, Indonesia",
    phone_number: "0812-3067-0056",
    website: "http://www.wearegypsy.com/bali",
    latitude: -8.653026,
    longitude: 115.131035,
    place_id: "ChIJfyzpyXk40i0RWMIepwHfdtc",
    price_level: nil,
    photos:
    ["https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAANM0nrfQ8YlQVEHcFp8AVSUf-GG3OoCJX8lHBF2QyVEkghBTbA_BW4KdauW3D9XPkCUmtVeshCtSrWgnLHvRwA33YwD5eSJGubityJOLRLHFpySYCcIBhNcZrdupDFWe4EhC698-EuOCnX5pqE_o-6lJXGhTzAOI10uCi4v6C2KLNyrEDq73eSA&key=AIzaSyAwvBJlD1AlfTMOXP2IZdAD8SIVvi_GEjM",
     " https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAbv57MuVUp7YCD78HjGf5FWkSjhvWeSVmCpRHyBRcRTIvZOsSUeFh9sx3xqnjZSN3L1-tf_7YY8SOlzheVQPuL_ipwbVccvbUpwQhNegEY8pqLyG_2b-QXC94FjRW7V6AEhBLm55XEC2YbeObrBVNtNrwGhQog9ggJa4BvxOOhVGjgFWACYrWyQ&key=AIzaSyAwvBJlD1AlfTMOXP2IZdAD8SIVvi_GEjM",
     " https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAALL__jVM-AlxeKJa9uOVmQ-PZECPUi3y3CKJeZ6Tobq-07JvbIwM2-Mn4fr8u9QXOj0KoMXkcs-gQOp333sr3_2_kxO8eGEjcGQxi-ZLtWSWxkjeuuWIkN5a0WH68TzJjEhBNatpHQh05hiymFSD2dFf7GhSEPQU4Lgg2UojnZkfSjvKdbW9qlQ&key=AIzaSyAwvBJlD1AlfTMOXP2IZdAD8SIVvi_GEjM"],
     opening_hours:
     ["Monday: 8:00 AM – 10:00 PM",
       "Tuesday: 8:00 AM – 10:00 PM",
       "Wednesday: 8:00 AM – 10:00 PM",
       "Thursday: 8:00 AM – 10:00 PM",
       "Friday: 8:00 AM – 10:00 PM",
       "Saturday: 8:00 AM – 10:00 PM",
       "Sunday: 8:00 AM – 10:00 PM"]
       )

  Restaurant.create!(
    name: "The Mocca",
    address: "Gg. Nyepi, Canggu, Kec. Kuta Utara, Kabupaten Badung, Bali 80351, Indonesia",
    phone_number: "0812-3865-7373",
    website: "https://www.facebook.com/themocca/",
    latitude: -8.6531575,
    longitude: 115.1316918,
    place_id: "ChIJ1UOc4QQ50i0RzGcaT334kwE",
    price_level: nil,
    photos:
    ["https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAhRZFjo4AB7J9wXC6Bds0zLWujD8kuJruK5-sOkvvvTUPY4FL-8vUCjlNb4p9QmrcUwx139i0ZMVWkV04NdAS3pjE6Rx-ippAqITucEqo3XR-gHWjPtFJ0A1Um7R9tNN9EhCtv6uAbRxGdCjJMrk8tGQeGhQ7-AoWr-1pjB19LCX9ou1XdMlbrg&key=AIzaSyAwvBJlD1AlfTMOXP2IZdAD8SIVvi_GEjM",
     " https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAfZAH9iz9zVO-MDJZw1A1_hhZIjTG0Q6m_7eX1DRz3xzbUTNDqg3k24TGHhl4chn089NODrftPK5mf-BG4TbFxngR4NBku9vds4vwmWPoLYNOooMGSvEZewUXI2EqXfbkEhDCtqFqvq29YyY6PgnJyn6ZGhR1FaduGGRTMo5gK5cmAZJq-mgbhg&key=AIzaSyAwvBJlD1AlfTMOXP2IZdAD8SIVvi_GEjM",
     " https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAA-cB00wNIORkfAEDkFIuCKDX0OFc2Cz64sNVWW65yd7QGJOTfMsto17uVDFiL-NmHUNgaJ6Fwmj-v4_Tpcpb5LGAbJK--KyRuEljNQdV0XEYnx5rKk-p7xG0lWQxXty95EhBFTBHq8Bd6lZiIdPrwMO_tGhQ7__eI3yb9JNVFIOFhlAaNJu5xeA&key=AIzaSyAwvBJlD1AlfTMOXP2IZdAD8SIVvi_GEjM"],
     opening_hours:
     ["Monday: 7:00 AM – 10:00 PM",
       "Tuesday: 7:00 AM – 10:00 PM",
       "Wednesday: 7:00 AM – 10:00 PM",
       "Thursday: 7:00 AM – 10:00 PM",
       "Friday: 7:00 AM – 10:00 PM",
       "Saturday: 7:00 AM – 10:00 PM",
       "Sunday: 7:00 AM – 10:00 PM"]
       )

  Restaurant.create!(
    name: "Rollies",
    address: "Jl. Canggu Padang Linjong, Canggu, Kec. Kuta Utara, Kabupaten Badung, Bali 80361, Indonesia",
    phone_number: "0821-4456-6210",
    website: "https://www.facebook.com/Rollies-Canggu-2162082830769432/",
    latitude: -8.6500105,
    longitude: 115.1300977,
    place_id: "ChIJGwjheuE50i0RRke32-Q3I3s",
    price_level: nil,
    photos:
    ["https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAHOQTK7q2_qsPSbyjQr8nOvL20VjK8iH3mz3ClkO1cF5j7gzlBzV5xVTVHCf_ey0hQCqquA47Wh41dQ4gtY9_cq3i5rETijTvidrbI_gd15RKBWjcFSYGdC7w3u_bFCIMEhAsOJaYL4UNeQVZhI0CDTFPGhTqBCN8Ahfyz378sROjrdoCMiA8DA&key=AIzaSyAwvBJlD1AlfTMOXP2IZdAD8SIVvi_GEjM",
     " https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAV0vUdtVNlwltEHToj0L1bvpHhlYXrjMEn0_sP8hUQDLV50be9dp25d0omE47L3-OKaF3fu0iKBLD7eArpE2ZGTldcZaTKtVM9C9AFoTXC3TjMUBCUPUuUtP8zMFJuhVWEhDcCar64l95Dbg0q5glJRU3GhTstUDVAggrkUSHRThUmraWUNrelg&key=AIzaSyAwvBJlD1AlfTMOXP2IZdAD8SIVvi_GEjM",
     " https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAsFj42Q0eIV9nhCbGcuJ7JB7BW5_eeRlLWWj8dWkmZWuEUb33R1C5o61aOOvQ_BSmguYJP8ytQAUDzdowvQc_AiibCAMD3ciNc-BFMV0_rMWv_WHYI_deHkqTWq2hh-QIEhCYZTE0XCR5kKHULj8cCtG8GhRo19cGazW6zz6-5Lh1Lq7XgxJOMQ&key=AIzaSyAwvBJlD1AlfTMOXP2IZdAD8SIVvi_GEjM"],
     opening_hours:
     ["Monday: 7:00 AM – 4:00 PM",
       "Tuesday: 7:00 AM – 4:00 PM",
       "Wednesday: 7:00 AM – 4:00 PM",
       "Thursday: 7:00 AM – 4:00 PM",
       "Friday: 7:00 AM – 4:00 PM",
       "Saturday: 7:00 AM – 4:00 PM",
       "Sunday: 7:00 AM – 4:00 PM"],
       )
end

def setup_restos_list(user_email)
  # TODO make this users list constant
  tester_user = User.find_by(email: user_email)
  second_user = User.all[1]
  third_user = User.all[2]
  last_user = User.last

  fabrica = Restaurant.first
  shady_shack = Restaurant.all[1]
  pretty_poison = Restaurant.all[2]
  gypsy = Restaurant.all[3]
  mocca = Restaurant.all[4]
  rollies = Restaurant.all[5]

  tester_user.add_restaurant(fabrica)
  tester_user.add_restaurant(shady_shack)

  second_user.add_restaurant(pretty_poison)
  second_user.add_restaurant(mocca)

  third_user.add_restaurant(gypsy)
  third_user.add_restaurant(fabrica)

  last_user.add_restaurant(rollies)
end

def complete_seed(user_email)
  puts
  puts "-----------------------------------------"
  puts "Setup and destroy all models except the test user"
  puts "-----------------------------------------"

  Restaurant.destroy_all
  Friendship.destroy_all
  List.destroy_all
  User.where.not(email: user_email).destroy_all

  3.times do |index|
    User.create!(
      name: "Test User #{index + 1}",
      email: "test#{index + 1}@email.com",
      password: "test123"
      )
  end

  puts

  puts "-----------------------------------------"
  puts "Create friendship among first 4 users"
  puts "-----------------------------------------"

  setup_friendships(user_email)

  if User.all.count < 5
    puts

    setup_restos

    puts "-----------------------------------------"
    puts "Create #{Restaurant.all.count} restos"
    puts "-----------------------------------------"

    puts

    puts "-----------------------------------------"
    puts "Create restaurant list for each users"
    puts "-----------------------------------------"

    setup_restos_list(user_email)

    puts
    puts "END SEED"
  end
end

def setup_seed
  puts "START SEED"
  puts

  puts "before we start with the seed, we need to make sure that you've signed up with your own facebook account to proceed with this seed.\nType (y) if you have, type (n) if you haven't"
  answer = STDIN.gets.chomp

  if answer == "y"
    puts
    puts "Type your test user's facebook email"
    email = STDIN.gets.chomp

    if User.find_by(email: email)
      complete_seed(email)
    else
      puts
      puts "-----------------------------------------"
      puts "Terminate seed, can't find the user with the given email. Please login again before running this seed"
      puts "-----------------------------------------"
    end
  else
    puts
    puts "-----------------------------------------"
    puts "Terminate seed, please login with your own facebook before running this seed"
    puts "-----------------------------------------"
  end
end

setup_seed

