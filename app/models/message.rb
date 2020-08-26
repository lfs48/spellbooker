class Message < ApplicationRecord

    validates :subject, :body, presence: true

end