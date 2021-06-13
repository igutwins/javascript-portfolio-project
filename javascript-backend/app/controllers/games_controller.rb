class GamesController < ApplicationController

    def index 
        games = Game.all
        render json: games
    end 

    def create
        game = Game.create(date: params[:date], time: params[:time], location: params[:location])
        render json: game
    end 

end
