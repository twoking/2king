require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(name: "Example User", email: "user@example.com", password: "test123")
    @michael = users(:michael)
    @resto_1 = restaurants(:resto_1)
    @resto_2 = restaurants(:resto_2)
  end

  test "validation validate" do
    assert @user.valid?
  end

  test "validation name should be present" do
    @user.name = "     "
    assert_not @user.valid?
  end

  test "validation email should be present" do
    @user.email = "     "
    assert_not @user.valid?
  end

  test "validation email should accept valid addresses" do
    valid_addresses = %w[user@example.com USER@foo.COM A_US-ER@foo.bar.org
                         first.last@foo.jp alice+bob@baz.cn]
    valid_addresses.each do |valid_address|
      @user.email = valid_address
      assert @user.valid?, "#{valid_address.inspect} should be valid"
    end
  end

  test "validation email should reject invalid addresses" do
    invalid_addresses = %w[user@example,com user_at_foo.org user.name@example.
                           foo@bar_baz.com foo@bar+baz.com foo@bar..com]
    invalid_addresses.each do |invalid_address|
      @user.email = invalid_address
      assert_not @user.valid?, "#{invalid_address.inspect} should be invalid"
    end
  end

  test "validation email addresses should be unique" do
    duplicate_user = @user.dup
    duplicate_user.email = @user.email.upcase
    @user.save
    assert_not duplicate_user.valid?
  end

  test "validation email addresses should be saved as lower-case" do
    mixed_case_email = "Foo@ExAMPle.CoM"
    @user.email = mixed_case_email
    @user.save
    assert_equal mixed_case_email.downcase, @user.reload.email
  end

  test "validation password should be present (nonblank)" do
    @user.password = @user.password_confirmation = " " * 6
    assert_not @user.valid?
  end

  test "validation password should have a minimum length" do
    @user.password = @user.password_confirmation = "a" * 5
    assert_not @user.valid?
  end

  test "[restos] user should be able to add restaurant in his/her list" do
    @michael.add_restaurant(@resto_1)
    assert @michael.restaurants.include? @resto_1
  end

  test "[restos] user should be able to remove restaurant in his/her list" do
    @michael.add_restaurant(@resto_1)
    @michael.add_restaurant(@resto_2)
    @michael.remove_restaurant(@resto_1)
    assert_not @michael.restaurants.include? @resto_1
  end
end
