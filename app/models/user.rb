class User < ActiveRecord::Base
  include HasUrlSlug
  has_and_belongs_to_many :roles
  has_many :enrollments
  has_many :courses, through: :enrollments

  has_many :timeables
  has_many :availabilities, through: :timeables

  devise :rememberable,
      :database_authenticatable,
      :registerable,
      :trackable,
      :recoverable,
      :validatable,
      password_length: 8..30

  validates_confirmation_of :password

  validates :email, :display_name, :url_slug, presence: true, uniqueness: true

  def self.authentication_keys
    [ :email ]
  end

  def self.remember_for
    12.months
  end

  def admin?
    self.roles.where(:name => 'admin').present?
  end

  def volunteer?
    self.roles.where(:name => 'volunteer').present?
  end

  def student?
    self.roles.where(:name => 'student').present?
  end

  def remember_me
    true
  end

  private

  def self.field_used_for_url_slug
    :display_name
  end
end
