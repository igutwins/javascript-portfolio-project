class CreateGames < ActiveRecord::Migration[6.1]
  def change
    create_table :games do |t|
      t.date :date
      t.time :time
      t.string :location

      t.timestamps
    end
  end
end
