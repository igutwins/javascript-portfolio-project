class PlayersController < ApplicationController

    def index 
        players = Player.all
        render json: players
    end 

    def add_player_to_game
        game = Game.find_by(:id => params[:game_id])
        player = Player.find_by(:id => params[:player_id])
        game.players << player
    end 

    def show_game_players
        game = Game.find_by(:id => params[:game_id])
        players = game.players
        render json: players
    end 

end
