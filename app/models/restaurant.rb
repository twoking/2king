class Restaurant < ApplicationRecord
  include SearchableByApi
  validates_presence_of :place_id, :name, :address
  has_many :lists, dependent: :destroy

  def open_now?
    today_day = Date.today.strftime("%A")
    today_schedule = self.opening_hours.select {|d| d.include?(today_day)}.first.split(" ")
    morning_opening = today_schedule[1].to_i
    evening_close = today_schedule[-2].to_i + 12
    if (morning_opening..evening_close).include?(Time.now.hour)
      return "OPEN"
    else
      return "CLOSE"
    end
  end


  #List ID based on current_user and restaurant
  def user_list(user)
    List.find_by(restaurant: self, user: user)
  end

  def display_price_level
    string = ""
    self.price_level.to_i.times { string.concat("$") }
    string
  end
end
