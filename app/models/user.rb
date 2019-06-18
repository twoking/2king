class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: %i[facebook]

  # association
  has_many :friendships, class_name: "Friendship",
                        foreign_key: "follower_id",
                        dependent: :destroy
  has_many :passive_friendships, class_name:  "Friendship",
                                foreign_key: "followed_id",
                                dependent:   :destroy

  has_many :followings, through: :friendships, source: :followed
  has_many :followers, through: :passive_friendships, source: :follower

  # validation
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i

  validates_presence_of :name
  validates_format_of :email, with: VALID_EMAIL_REGEX

  # callbacks
  before_save { self.email = email.downcase }

  # instance methods
  def follow(another_user)
    followings << another_user
  end

  def unfollow(following_user)
    followings.delete(following_user)
  end

  def following?(another_user)
    followings.include?(another_user)
  end

  def follower?(another_user)
    followers.include?(another_user)
  end

  def second_degree_followings
    combined_followings = []
    combined_followings << followings
    combined_followings << followings.map(&:followings)
    combined_followings.flatten.uniq - [self]
  end

  def third_degree_followings
    combined_followings = []
    combined_followings << second_degree_followings
    combined_followings << second_degree_followings.map(&:followings)
    combined_followings.flatten.uniq - [self]
  end

  # class methods
  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0, 20]
      user.name = auth.info.name   # assuming the user model has a name
      user.photo = auth.info.image # assuming the user model has an image
      # If you are using confirmable and the provider(s) you use validate emails,
      # uncomment the line below to skip the confirmation emails.
      # user.skip_confirmation!
    end
  end

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
        user.email = data["email"] if user.email.blank?
      end
    end
  end
end
