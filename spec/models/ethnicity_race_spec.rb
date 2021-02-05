require 'rails_helper'

RSpec.describe EthnicityRace, type: :model do
  it { is_expected.to have_db_column(:name).of_type(:string) }
  it { is_expected.to have_db_column(:spanish_name).of_type(:string) }
  it { is_expected.to have_db_column(:displayable).of_type(:boolean) }
  it { is_expected.to have_db_column(:created_at).of_type(:datetime) }
  it { is_expected.to have_db_column(:updated_at).of_type(:datetime) }
end