class PlayersController < ApplicationController

    def index 
        players = Player.all
        render json: players
    end 

    def add_player_to_game
    end 

    def remove_player_from_game
    end 

end
