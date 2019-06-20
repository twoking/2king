require 'test_helper'

class ApplicationHelperTest < ActionView::TestCase
  test "full title helper" do
    assert_equal full_title,         "2King"
    assert_equal full_title("Help"), "Help | 2King"
  end
end
