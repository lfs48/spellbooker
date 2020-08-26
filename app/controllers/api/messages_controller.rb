class Api::MessagesController < ApplicationController

    def create
        @message = Message.new(message_params)
        @message.save
    end

    def message_params
        params.require(:message).permit(:subject, :body)
    end

end