Rails.application.routes.draw do
  resources :games
  resources :players
  post '/addplayer' => 'players#add_player_to_game'
  post '/showgameplayers' => 'players#show_game_players'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
