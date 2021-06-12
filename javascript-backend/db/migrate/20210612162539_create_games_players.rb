class CreateGamesPlayers < ActiveRecord::Migration[6.1]
  def change
    create_table :games_players do |t|
      t.belongs_to :game
      t.belongs_to :player
    end
  end
end
