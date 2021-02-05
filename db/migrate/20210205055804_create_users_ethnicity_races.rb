class CreateUsersEthnicityRaces < ActiveRecord::Migration[5.2]
  def change
    create_table :users_ethnicity_races do |t|
      t.belongs_to :user, index: true
      t.belongs_to :ethnicity_race, index: true

      t.timestamps
    end
  end
end