import resend
import os
import logging

logger = logging.getLogger(__name__)

resend.api_key = os.environ["RESEND_API_KEY"]

TEAM_EMAIL   = os.environ.get("TEAM_EMAIL", "prince.felipillon@gmail.com")
FROM_EMAIL   = os.environ.get("FROM_EMAIL", "noreply@felipillon.com")
FROM_NAME    = "Felipillon Website"


async def send_contact_notification(name: str, email: str, company: str, service: str, message: str):
    """Notify team of new contact form submission."""
    try:
        resend.Emails.send({
            "from": f"{FROM_NAME} <{FROM_EMAIL}>",
            "to": [TEAM_EMAIL],
            "reply_to": email,
            "subject": f"New Inquiry from {name} — {service}",
            "html": f"""
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #C9973A; padding: 20px; border-radius: 8px 8px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 22px;">New Contact Inquiry</h1>
              </div>
              <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #eee;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; color: #666; width: 120px;"><strong>Name</strong></td>
                      <td style="padding: 8px 0;">{name}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666;"><strong>Email</strong></td>
                      <td style="padding: 8px 0;"><a href="mailto:{email}">{email}</a></td></tr>
                  <tr><td style="padding: 8px 0; color: #666;"><strong>Company</strong></td>
                      <td style="padding: 8px 0;">{company or "—"}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666;"><strong>Service</strong></td>
                      <td style="padding: 8px 0;">{service or "—"}</td></tr>
                </table>
                <div style="margin-top: 16px; padding: 16px; background: white; border-radius: 6px; border-left: 4px solid #C9973A;">
                  <strong style="color: #666;">Message:</strong>
                  <p style="margin: 8px 0 0; line-height: 1.6;">{message}</p>
                </div>
                <p style="margin-top: 20px; color: #999; font-size: 13px;">
                  Reply directly to this email to respond to {name}.
                </p>
              </div>
            </div>
            """,
        })
        logger.info(f"Contact notification sent for {email}")
    except Exception as e:
        logger.error(f"Failed to send contact notification: {e}")


async def send_contact_confirmation(name: str, email: str):
    """Confirm receipt to the person who submitted the contact form."""
    try:
        resend.Emails.send({
            "from": f"{FROM_NAME} <{FROM_EMAIL}>",
            "to": [email],
            "subject": "We received your inquiry — Felipillon",
            "html": f"""
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #C9973A; padding: 20px; border-radius: 8px 8px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 22px;">Thank you, {name}</h1>
              </div>
              <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #eee;">
                <p style="line-height: 1.7; color: #333;">
                  We've received your inquiry and a member of our team will be in touch
                  within <strong>one business day</strong>.
                </p>
                <p style="line-height: 1.7; color: #333;">
                  In the meantime, feel free to explore our
                  <a href="https://felipillon.com/specialities" style="color: #C9973A;">specialities</a>
                  or <a href="https://felipillon.com/open-roles" style="color: #C9973A;">open roles</a>.
                </p>
                <p style="margin-top: 24px; color: #333;">
                  Best regards,<br/>
                  <strong>The Felipillon Team</strong>
                </p>
              </div>
            </div>
            """,
        })
        logger.info(f"Contact confirmation sent to {email}")
    except Exception as e:
        logger.error(f"Failed to send contact confirmation: {e}")


async def send_application_notification(
    name: str, email: str, phone: str,
    role_title: str, department: str, location: str,
    cover_note: str, cv_url: str
):
    """Notify recruitment team of new job application."""
    try:
        resend.Emails.send({
            "from": f"{FROM_NAME} <{FROM_EMAIL}>",
            "to": [TEAM_EMAIL],
            "reply_to": email,
            "subject": f"New Application — {role_title} | {name}",
            "html": f"""
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #C9973A; padding: 20px; border-radius: 8px 8px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 22px;">New Job Application</h1>
                <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 15px;">{role_title}</p>
              </div>
              <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #eee;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; color: #666; width: 120px;"><strong>Name</strong></td>
                      <td style="padding: 8px 0;">{name}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666;"><strong>Email</strong></td>
                      <td style="padding: 8px 0;"><a href="mailto:{email}">{email}</a></td></tr>
                  <tr><td style="padding: 8px 0; color: #666;"><strong>Phone</strong></td>
                      <td style="padding: 8px 0;">{phone or "—"}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666;"><strong>Role</strong></td>
                      <td style="padding: 8px 0;">{role_title}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666;"><strong>Department</strong></td>
                      <td style="padding: 8px 0;">{department or "—"}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666;"><strong>Location</strong></td>
                      <td style="padding: 8px 0;">{location or "—"}</td></tr>
                </table>

                {"<div style='margin-top:16px; padding:16px; background:white; border-radius:6px; border-left:4px solid #C9973A;'><strong style='color:#666;'>Cover Note:</strong><p style='margin:8px 0 0; line-height:1.6;'>" + cover_note + "</p></div>" if cover_note else ""}

                {"<div style='margin-top:16px;'><a href='" + cv_url + "' style='display:inline-block; background:#C9973A; color:white; padding:10px 20px; border-radius:6px; text-decoration:none; font-weight:bold;'>Download CV</a></div>" if cv_url else ""}

                <p style="margin-top: 20px; color: #999; font-size: 13px;">
                  Reply directly to this email to contact the applicant.
                </p>
              </div>
            </div>
            """,
        })
        logger.info(f"Application notification sent for {name} — {role_title}")
    except Exception as e:
        logger.error(f"Failed to send application notification: {e}")


async def send_application_confirmation(name: str, email: str, role_title: str):
    """Confirm receipt to the job applicant."""
    try:
        resend.Emails.send({
            "from": f"{FROM_NAME} <{FROM_EMAIL}>",
            "to": [email],
            "subject": f"Application received — {role_title} | Felipillon",
            "html": f"""
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #C9973A; padding: 20px; border-radius: 8px 8px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 22px;">Application Received</h1>
                <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0;">{role_title}</p>
              </div>
              <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #eee;">
                <p style="line-height: 1.7; color: #333;">Hi {name},</p>
                <p style="line-height: 1.7; color: #333;">
                  Thank you for applying for the <strong>{role_title}</strong> position at Felipillon.
                  We've received your application and our recruitment team will review it carefully.
                </p>
                <p style="line-height: 1.7; color: #333;">
                  We aim to be in touch within <strong>2 business days</strong>.
                </p>
                <p style="margin-top: 24px; color: #333;">
                  Best regards,<br/>
                  <strong>Felipillon Recruitment Team</strong>
                </p>
              </div>
            </div>
            """,
        })
        logger.info(f"Application confirmation sent to {email}")
    except Exception as e:
        logger.error(f"Failed to send application confirmation: {e}")