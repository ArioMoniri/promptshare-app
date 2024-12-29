class UserMailer < ApplicationMailer
  def confirmation_email(user)
    @user = user
    @confirmation_url = "http://example.com/confirm_email?token=#{@user.confirmation_token}"
    mail(to: @user.email, subject: 'Confirm your email')
  end

  def reset_password_email(user)
    @user = user
    @reset_password_url = "http://example.com/reset_password?token=#{@user.reset_password_token}"
    mail(to: @user.email, subject: 'Reset your password')
  end
end

